import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: 'img' })
export class LazyImgDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target as HTMLImageElement;

                image.src = image.dataset['src'] as string;

                imageObserver.unobserve(image);
            }
        });
    });

    imageObserver.observe(nativeElement);
  }
}