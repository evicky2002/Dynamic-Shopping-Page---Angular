import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
    /**
     * Pipe filters the list of elements based on the search text provided
     *
     * @param items list of elements to search in
     * @param searchText search string
     * @returns list of elements filtered by search text or []
     */
    transform(items: any[], searchText: string): any[] {
        console.log("from pipe",);
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter(it => {
            console.log(searchText);
            if (it.itemName.toLocaleLowerCase().includes(searchText)) {
                console.log("has");
                return it
            } else {
                console.log("not here");
            }
        });
    }
}