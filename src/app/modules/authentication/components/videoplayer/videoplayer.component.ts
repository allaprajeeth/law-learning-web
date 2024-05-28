import {Component, ElementRef,Input,QueryList,Renderer2,ViewChild,ViewChildren,} from '@angular/core';
import { Course } from 'src/app/common/models/course.model';

 
@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss'],
})
export class VideoplayerComponent {

  @Input() course: Course | undefined;
  
}
 