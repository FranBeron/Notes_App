export class Note {
  backgroundColor: string;
  content: string;
  createdAt: Date;
  new: boolean;
  title: string;

  constructor(
    title: string,
    content: string,
    backgroundColor: string,
    createdAt: Date = new Date(),
    isNew: boolean = true
  ) {
    this.title = title;
    this.backgroundColor = backgroundColor;
    this.content = content;
    this.createdAt = createdAt;
    this.new = isNew;
  }
}
