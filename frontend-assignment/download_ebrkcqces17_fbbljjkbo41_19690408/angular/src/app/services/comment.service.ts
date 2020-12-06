import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const API_PREFIX = "/api";

@Injectable({
  providedIn: "root"
})
export class CommentService {

  constructor(private http: HttpClient) { }

  /**
   * Reset comments back to original state.
   */
  resetComments(): Observable<any> {
    return this.http.post(`${API_PREFIX}/reset-comments`, {});
  }
  getAllComments(): Observable<any> {
    return this.http.get(`${API_PREFIX}/comments`);
  }
  deleteComment(id): Observable<any> {
    return this.http.delete(`${API_PREFIX}/comments/${id}`);
  }
  addComment(data): Observable<any>{
    return this.http.post(`${API_PREFIX}/comments`, data);
  }

  searchComments(string): Observable<any>{
    return this.http.get(`${API_PREFIX}/comments?q=${string}`);
  }
}
