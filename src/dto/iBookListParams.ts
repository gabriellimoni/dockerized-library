import ListParams from "./iListParams";

export default interface BookListParams extends ListParams {
    name?: string,
    edition?: string,
    year?: number,
    library_id?: number,
}