// src/app/services/produto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Produto } from 'src/app/models/produto';
import { ResponseInterface } from 'src/app/models/response-interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) {}

  // Método para listar todos os produtos
  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Método para adicionar um novo produto
  adicionarProduto(produto: Produto): Observable<ResponseInterface> {
    return this.http.post<ResponseInterface>(this.apiUrl, produto).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obter um produto por ID
  obterProduto(id: string): Observable<ResponseInterface> {
    return this.http.get<ResponseInterface>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para atualizar um produto por ID
  atualizarProduto(id: string, produto: Produto): Observable<ResponseInterface> {
    return this.http.put<ResponseInterface>(`${this.apiUrl}/${id}`, produto).pipe(
      catchError(this.handleError)
    );
  }

  // Método para excluir um produto por ID
  excluirProduto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método de tratamento de erros
  private handleError(error: any) {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error('Erro na comunicação com a API.'));
  }
}
