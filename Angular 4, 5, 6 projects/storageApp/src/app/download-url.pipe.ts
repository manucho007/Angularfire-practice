import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireStorage} from 'angularfire2/storage';
import 'rxjs/add/operator/do';
@Pipe({
  name: 'downloadUrl'
})
export class DownloadUrlPipe implements PipeTransform {

        constructor(public storage: AngularFireStorage){}

        transform(featuredPhoto: any): any {
            let photo = this.storage.ref(featuredPhoto).getDownloadURL().do(console.log);
            return photo;
        }
    }
