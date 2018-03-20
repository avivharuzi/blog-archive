export class Post {
  public title: string;
  public slug: string;
  public author: string;
  public summary: string;
  public body: string;
  public tags: string[];
  public category: string;
  public isPublished: boolean;
  public publishDate: string;
  public coverImage: any;
  public existPostTitle?: string;
  public existPostSlug?: string;
  public existPostCoverImage?: any;
  public existPostCategory?: any;

  public constructor(
    _title: string, _slug: string, _author: string, _summary: string, _body: string,
    _tags: string[], _category: string, _isPublished: boolean, _publishDate: string, _coverImage: any,
    _existPostTitle?: string, _existPostSlug?: string, _existPostCoverImage?: any, _existPostCategory?: any
  ) {
    this.title = _title;
    this.slug = _slug;
    this.author = _author;
    this.summary = _summary;
    this.body = _body;
    this.tags = _tags;
    this.category = _category;
    this.isPublished = _isPublished;
    this.publishDate = _publishDate;
    this.coverImage = _coverImage;
    this.existPostTitle = _existPostTitle;
    this.existPostSlug = _existPostSlug;
    this.existPostCoverImage = _existPostCoverImage;
    this.existPostCategory = _existPostCategory;
  }
}
