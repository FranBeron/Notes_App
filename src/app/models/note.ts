export class Note {
  title: string;
  content: string;
  backgroundColor: string;
  createdAt: Date;
  new: boolean;
  id: number;
  favorite: boolean; 
  
  constructor(
    title: string,
    content: string,
    backgroundColor: string,
    createdAt: Date = new Date(),
    noteIsNew: boolean = true,
    favorite: boolean = false,
    id: number =0,
  ) {
    this.title = title;
    this.content = content;
    this.backgroundColor = backgroundColor;
    this.createdAt = createdAt;
    this.new = noteIsNew;
    this.id = id;
    this.favorite = favorite; // asignar el valor de la propiedad favorite
  }
}
