import { Produto } from "./produto"

export interface ResponseInterface {
    success: boolean
    message: string
    data: Produto
}
