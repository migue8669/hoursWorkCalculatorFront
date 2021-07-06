import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name:'filter'
})
export class FilterPipe implements PipeTransform{
transform(value:any,arg:any):any{
  const resultPost=[];
  for(const post of value){
    if(post.name !=null && post.name.indexOf(arg)> -1){
      resultPost.push(post);
    };

  };
  return resultPost;
}
}
