import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data: any;
  constructor(private http:HttpClient) { }
  // url="http://localhost:3000/posts";
  postEmployee(data: any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
getEmployee(){
  return this.http.get("http://localhost:3000/posts")
  .pipe(map((res:any)=>{
    return res;
  }))
}
updateEmployee(data: any,id:number){
  return this.http.put<any>("http://localhost:3000/posts/"+id,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
deleteEmployee(id:number){
  return this.http.delete<any>("http://localhost:3000/posts/"+id)
  .pipe(map((res:any)=>{
    return res;
  }))
}
 }
