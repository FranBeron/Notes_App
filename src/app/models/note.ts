export class Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  backgroundColor: string;
  createdAt: Date;
  new: boolean;
  favorite: boolean;
  constructor(
    id: string = '',
    userId: string = '',
    title: string,
    content: string,
    backgroundColor: string,
    createdAt: Date = new Date(),
    noteIsNew: boolean = true,
    favorite: boolean = false
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.backgroundColor = backgroundColor;
    this.createdAt = createdAt;
    this.new = noteIsNew;
    this.favorite = favorite;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      content: this.content,
      backgroundColor: this.backgroundColor,
      createdAt: this.createdAt.toISOString(),
      new: this.new,
      favorite: this.favorite,
    };
  }

}
