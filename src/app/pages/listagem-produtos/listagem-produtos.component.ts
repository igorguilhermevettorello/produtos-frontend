import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto/produto.service';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  filtroNome: string = '';
  mensagemSucesso = '';
  mensagemErro = '';
  loading = false;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  // Método para carregar produtos
  carregarProdutos() {
    this.loading = true;
    this.produtoService.listarProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.produtosFiltrados = produtos;
        this.loading = false;
      },
      error: (error) => {
        this.mensagemErro = 'Erro ao carregar produtos. Tente novamente.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  filtrarProdutos() {
    const termo = this.filtroNome.toLowerCase().trim();
    if (termo) {
      this.produtosFiltrados = this.produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo)
      );
    } else {
      this.produtosFiltrados = [...this.produtos]; // Restaura a lista original
    }
  }

  // Método para redirecionar para edição
  editarProduto(id: string) {
    this.router.navigate(['/produtos/editar', id]);
  }

  esconderMensagem() {
    setTimeout(() => {
      this.mensagemSucesso = '';
      this.mensagemErro = '';
    }, 3000);
  }

  // Método para deletar produto
  deletarProduto(id: string) {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.excluirProduto(id).subscribe({
        next: () => {
          this.mensagemSucesso = 'Produto excluído com sucesso!';
          this.carregarProdutos();
          this.esconderMensagem();
        },
        error: (error) => {
          this.mensagemErro = 'Erro ao excluir o produto. Tente novamente.';
          console.error(error);
          this.esconderMensagem();
        }
      });
    }
  }
}
