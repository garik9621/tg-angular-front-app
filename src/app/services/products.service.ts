import { Injectable } from '@angular/core';

const domain = 'https://result.school';

export enum ProductType {
  SKILL = 'skill',
  INTENSIVE = 'intensive',
  COURSE = 'course'
}

export interface IProduct {
  id: string;
  text: string;
  title: string;
  link: string;
  image: string;
  time: string;
  type: ProductType;
}

function addDomainToLinkAndImage(product: IProduct) {
  return {
    ...product,
    image: domain + product.image,
    link: domain + product.link
  }
}

export const products: IProduct[] = [
  {
    id: '29',
    text: 'Ts',
    title: '1',
    link: '/products/ts',
    image: '',
    time: '',
    type: ProductType.SKILL,
  },
  {
    id: '30',
    text: 'Ts',
    title: '1',
    link: '/products/ts',
    image: '',
    time: '',
    type: ProductType.COURSE,
  },
  {
    id: '31',
    text: 'Ts',
    title: '1',
    link: '/products/ts',
    image: '',
    time: '',
    type: ProductType.INTENSIVE,
  },
]

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly products: IProduct[] = products.map(addDomainToLinkAndImage);

  getById(id: string) {
    return this.products.find(product => product.id == id)
  }

  get byGroup() {
    return this.products.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }

      acc[item.type].push(item)

      return acc;
    }, []);
  }
}
