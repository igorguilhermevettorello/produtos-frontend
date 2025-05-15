import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemProdutosComponent } from './pages/listagem-produtos/listagem-produtos.component';
import { AdicionarProdutoComponent } from './pages/adicionar-produto/adicionar-produto.component';
import { EditarProdutoComponent } from './pages/editar-produto/editar-produto.component';

const routes: Routes = [
  { path: 'produtos', component: ListagemProdutosComponent },
  { path: 'produtos/adicionar', component: AdicionarProdutoComponent },
  { path: 'produtos/editar/:id', component: EditarProdutoComponent },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
