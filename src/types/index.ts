// export type Memo = {
//   id: number;
//   text: string;
//   timestamp: string;
// };

// export type Reply = Memo & {
//   parentId: number;
// };

export interface Memo {
  id: number;
  text: string;
  timestamp: string;
}

export interface Reply extends Memo {
  parentId: number;
}
