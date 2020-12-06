import { Component, OnDestroy, OnInit } from "@angular/core";
import {FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators'

import { CommentService } from "./../../services/comment.service";

@Component({
  selector: "app-comment-feed",
  templateUrl: "./comment-feed.component.html",
  styleUrls: ["./comment-feed.component.css"]
})
export class CommentFeedComponent implements OnInit, OnDestroy {
  protected commentsLookup: Subject<void> = new Subject();
  comments: Comment[];
  commentText = '';
  searchText = '';
  errorMessage = "";
  commentsList: any;
  subscription: any;
  showLoader: boolean = false;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.getAllComments();
    this.subscription = this.commentsLookup.pipe(switchMap(() => {
      this.showLoader = true;
      return this.commentService.searchComments(this.searchText);
    })).subscribe(
      (result) => { this.showLoader = false;
        this.comments = result; }
    )
  } 

  getAllComments(){
    this.showLoader = true;
    this.subscription =  this.commentService.getAllComments().subscribe((res) => {
      this.comments = res;
      this.showLoader = false;
    })
  }

  resetCommentFeed() {
    this.showLoader = true;
    this.subscription = this.commentService.resetComments().subscribe((res) => {
      this.showLoader = false;
      this.getAllComments();
    })
  }

  deleteComment(id){
    this.showLoader = true;
    this.subscription = this.commentService.deleteComment(id).subscribe((res) => {
      this.showLoader = false;
      this.comments = this.comments.filter((item) => item['id'] != id )
    })
  }

  addComment(){
    const data = {
      id: Math.floor(Math.random() * 10),
      text: this.commentText
    }
    this.showLoader = true;
    this.subscription = this.commentService.addComment(data).subscribe((res) => {
      this.comments.push(res);
      this.showLoader = false;
    })
  }

  searchComments(){
    this.commentsLookup.next();
  }

  ngOnDestroy(){
    this.subscription.unSubscribe();
  }
}
