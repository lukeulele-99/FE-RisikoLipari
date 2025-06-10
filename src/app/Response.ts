//Interfaccia che serve per generare una risposta con esito positivo o negativo agganciando a T che sarebbe il dato in questione
export interface Response<T> {
    success: boolean,
    error: string,
    data: T
}