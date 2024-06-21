import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subscription, catchError, count, map, of, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	private unreadMessageCountSubject = new BehaviorSubject<number>(0);
	unreadMessageCount$: Observable<number> = this.unreadMessageCountSubject.asObservable();
	private intervalSubscription: Subscription | null = null;
	constructor(private matSnackBar: MatSnackBar, private http: HttpClient) {
		
	}
	private fetchUnreadMessageCount(): Observable<number> {
		// Simulate fetching unread message count from API
		const url = environment.endpoints.secureBaseURL + environment.endpoints.unReadNotificationCount;
		return this.http.get(url).pipe(
			map((response: any) => {
				// Assuming the response contains the unread message count in a property named 'count'
				// You may need to adjust this according to the actual structure of your API response
				return Number(response.data);
			})
		);
	}

	startTimer() {
		if(this.intervalSubscription) {
			return;
		}
		this.intervalSubscription = timer(0, 300000).pipe(
			switchMap(() => this.fetchUnreadMessageCount()),
			catchError(error => {
			  console.error('Error fetching unread message count:', error);
			  return of(0);
			}),
			// Ensure TypeScript correctly infers the type of the emitted valuen
			map(count => typeof count === 'number' ? count : 0) // Convert unknown to number
		  ).subscribe(count => {
			this.unreadMessageCountSubject.next(count);
		  });
	}

	stopTimer() {
		if (this.intervalSubscription) {
		  this.intervalSubscription.unsubscribe();
		}
	}

	ngOnDestroy() {
		this.stopTimer();
	}

	notify(message: string, duration: number = 4000) {
		this.matSnackBar.open(message, 'Close', {
			duration,
			verticalPosition: 'top',
		});
	}
}

