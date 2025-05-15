import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Produto } from 'src/app/models/produto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  produtoForm!: FormGroup;
  categorias: Categoria[] = [];
  produtoId!: string;
  loading = false;
  mensagemSucesso = '';
  mensagemErro = '';

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      quantidade: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', [Validators.required]]
    });

    this.produtoId = this.route.snapshot.paramMap.get('id')!;
    this.carregarProduto();
    this.carregarCategorias();
  }

  // Método para carregar o produto e preencher o formulário
  carregarProduto() {
    this.loading = true;
    this.produtoService.obterProduto(this.produtoId).subscribe({
      next: (responseInterface) => {

        if (responseInterface.success) {
          this.produtoForm.patchValue({
            id: responseInterface.data.id,
            nome: responseInterface.data.nome,
            quantidade: responseInterface.data.quantidade,
            categoria: responseInterface.data.categoria
          });
        } else {
          this.mensagemErro = responseInterface.message;
        }

        
        this.loading = false;
      },
      error: (error) => {
        this.mensagemErro = 'Erro ao carregar o produto.';
        console.error(error);
        this.loading = false;
      }
    });
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

  get id() {
    return this.produtoForm.get('id');
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

  esconderMensagem() {
    setTimeout(() => {
      this.mensagemSucesso = '';
      this.mensagemErro = '';
      this.loading = false;
    }, 3000);
  }

  // Método para salvar as alterações do produto
  salvarProduto() {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }

    let produto = this.produtoForm.getRawValue() as Produto;

    this.loading = true;
    this.produtoService.atualizarProduto(this.produtoId, produto).subscribe({
      next: (responseInterface) => {
        if (responseInterface.success) {
          this.mensagemSucesso = responseInterface.message;
        } else {
          this.mensagemErro = responseInterface.message; 
        }
        this.esconderMensagem();
      },
      error: (error) => {
        this.mensagemErro = 'Erro ao atualizar o produto.';
        console.error(error);
        this.loading = false;
        this.esconderMensagem();
      }
    });
  }
}
