export class Category {
  public name: string;
  public image: any;
  public existCategoryName?: string;
  public existCategoryImage?: string;

  public constructor(
    _name: string, _image: any, _existCategoryName?: string, _existCategoryImage?: string
  ) {
    this.name = _name;
    this.image = _image;
    this.existCategoryName = _existCategoryName;
    this.existCategoryImage = _existCategoryImage;
  }
}
