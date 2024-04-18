import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FetcharticlesService } from '../fetcharticles.service';
import { ArticleApiResponse } from '../fetcharticle.model';
import { UserDetailsService } from 'src/app/common/services/user-details/user-details.service';
import { endPoints } from 'src/app/common/constants/endpoints';
import { HttpClient } from '@angular/common/http';
import { AuthTokenService } from 'src/app/common/services/auth-token/auth-token.service';

@Component({
  selector: 'app-publishingcorner',
  templateUrl: './publishingcorner.component.html',
  styleUrls: ['./publishingcorner.component.scss']
})
export class PublishingcornerComponent implements OnInit {
  articles: ArticleApiResponse[] = [];
  filteredArticles: ArticleApiResponse[] = [];
  searchTerm: string = '';
  isVisible: boolean = false;
  isAdmin: boolean = false;


  userRole: string | undefined

  role:string | undefined;

  constructor(
    private fetcharticleService: FetcharticlesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthTokenService
  ) { }

  ngOnInit(): void {
    this.loadPublishArticles();
    this.checkRoute();
    const userDetails = this.authService.getUserDetails();
    this.role = userDetails?.role 
    this.isAdmin = userDetails?.role === 'ADMIN';
  }
  loadPublishArticles(): void {
    this.fetcharticleService.loadPublishArticles().subscribe(
      (response: any) => {
        this.articles = response.data.content || [];
        this.filteredArticles = [...this.articles];
        console.log(this.articles);
      },
      (error) => {
      }
    );
  }
  checkRoute() {
    const firstPathSegment = this.router.url.split('/')[1];
    this.isVisible = ['subscriber', 'instructor', 'article'].includes(firstPathSegment);
  }
  // isArticleRoute(): boolean {
  //   return this.router.url === '/article';
  // }

  searchArticles(): void {
    this.filteredArticles = this.articles.filter((article) =>
      article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    ||
    (article.author && article.author.toLowerCase().includes(this.searchTerm.toLowerCase()))

    ||
    (article.author && article.author.toLowerCase().includes(this.searchTerm.toLowerCase()))

    );
  }
  navigateToArticleDetail(articleId: number): void {
    console.log('Selected Article ID:', articleId);
    const currentUrl = this.router.url;

    // Determine the route prefix based on the current URL
    let routePrefix = '';
    if (currentUrl.includes('/admin/article')) {
      routePrefix = '/admin/publish-articles';
    } else if (currentUrl.includes('/instructor/article')) {
      routePrefix = '/instructor/publish-articles';
    } else if (currentUrl.includes('/authentication/article')) {
      routePrefix = '/authentication/publish-articles';
    } else if (currentUrl.includes('/reviewer/article')) {
      routePrefix = '/reviewer/publish-articles';
    } else if (currentUrl.includes('subscriber/article')) {
      routePrefix = 'subscriber/publish-articles';
    }
    else {
      routePrefix = '/publish-articles'
    }
    // Navigate using the dynamically constructed route
    this.router.navigate([routePrefix, articleId]);
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToArticleForm(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/subscriber/article')) {
      this.router.navigateByUrl('/subscriber/articleform');
    } else if (currentUrl.includes('instructor/article')) {
      this.router.navigateByUrl('/instructor/articleform');
    }else{
      this.router.navigate(['/login']);
    }
  }
  matchesBaseUrl(): any {
    return this.router.url === '/article';
  }
}


