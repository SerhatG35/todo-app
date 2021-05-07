export type User = {
    id:string
    token:string
    userName:string
} | null

export type TodoType ={
    todo:string,
    isCompleted:boolean
}

export type Card = {
    title:string | undefined,
    todos:TodoType[],
}