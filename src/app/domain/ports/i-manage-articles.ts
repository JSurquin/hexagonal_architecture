import { Observable } from "rxjs"
import { Articles } from "src/app/domain/models/articles"

export default interface IManageArticles {
    getArticles(): Observable<Articles[]>
    searchArticles(term: string): Observable<Articles[]>
    getArticle(id: number): Observable<Articles> 
    addArticle(Articles: Articles): Observable<Articles>
    updateArticle(Articles: Articles): Observable<Articles>
    deleteArticle(id: number): Observable<number>
}

