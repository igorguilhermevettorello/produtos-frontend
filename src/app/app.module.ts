import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListagemProdutosComponent } from './pages/listagem-produtos/listagem-produtos.component';
import { AdicionarProdutoComponent } from './pages/adicionar-produto/adicionar-produto.component';
import { EditarProdutoComponent } from './pages/editar-produto/editar-produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListagemProdutosComponent,
    AdicionarProdutoComponent,
    EditarProdutoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
