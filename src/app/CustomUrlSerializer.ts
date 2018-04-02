import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';
export class CustomUrlSerializer implements UrlSerializer {
    
    parse(url: any): UrlTree {
        let dus = new DefaultUrlSerializer();
        return dus.parse(url);
    }

    serialize(tree: UrlTree): any {
        let dus = new DefaultUrlSerializer(),
            path = dus.serialize(tree);
            
           /* var regex = /\b[A-Z]{2,}\b|%20/g;

            var modified = path.replace(regex, function(match) {
                console.log("urlser",match);
                return match.toLowerCase();
            }); */
            
        // use your regex to replace as per your requirement.
        return path.replace(/%20/g,'_');
    }
}