import { Observable } from "rxjs"
import { Articles } from "src/app/domain/models/articles"

export default interface IDisplayArticles {
    Articles: Articles[]
    filter: string
    askArticles(): Observable<void>
}