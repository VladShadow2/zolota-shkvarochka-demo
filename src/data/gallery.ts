export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/interior.jpg",
    alt: "Простора зала ресторану з дерев’яними столами, стільцями і великими вікнами",
    caption: "Ілюстративне фото",
  },
  {
    src: "/images/table-setting.jpg",
    alt: "Сервірований стіл при теплому світлі: тарілки, келихи і складені серветки",
    caption: "Ілюстративне фото",
  },
  {
    src: "/images/tables.jpg",
    alt: "Ряди дерев’яних столів у залі ресторану, готові до гостей",
    caption: "Ілюстративне фото",
  },
];
