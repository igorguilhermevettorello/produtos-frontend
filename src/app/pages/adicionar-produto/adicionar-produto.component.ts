import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Categoria } from 'src/app/models/categoria';
import { ResponseInterface } from 'src/app/models/response-interface';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {
  produtoForm!: FormGroup;
  categorias: Categoria[] = [];
  loading = false;
  mensagemSucesso = '';
  mensagemErro = '';

  constructor(
    private fb: FormBuilder, 
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      quantidade: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', [Validators.required]]
    });
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
        this.mensagemErro = 'Erro ao carregar categorias. Atualize a página novamente.';
      }
    });
  }

  get nome() {
    return this.produtoForm.get('nome');
  }

  get quantidade() {
    return this.produtoForm.get('quantidade');
  }

  get categoria() {
    return this.produtoForm.get('categoria');
  }

  async adicionarProduto() {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.produtoService.adicionarProduto(this.produtoForm.value).subscribe({
      next: (data:ResponseInterface) => {
        if (data.success) {
          this.mensagemSucesso = data.message;
          this.produtoForm.reset();
        } else {
          this.mensagemErro = data.message; 
        }
      },
      error: (error) => {
        this.mensagemErro = 'Erro ao adicionar o produto. Tente novamente.';
        console.error(error);
      },
      complete: () => {
        this.loading = false;

        // Limpar mensagens após 5 segundos automaticamente
        setTimeout(() => {
          this.mensagemSucesso = '';
          this.mensagemErro = '';
        }, 3000);
      }
    });
  }
}
