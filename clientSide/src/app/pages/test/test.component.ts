import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {SnotifyService} from 'ng-snotify';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    time = new Observable(observer => {
        setInterval(() => observer.next(new Date().toString()), 1000);
    });

    id = null;

    constructor(private http: HttpClient, private notify: SnotifyService) {
    }

    ngOnInit() {
      //  this.getData();
    }


    getData() {
        const req = new HttpRequest('post', 'http://127.0.0.1:8000/api/sendRestPasswordLink', {
            reportProgress: true,
            email: 'simobend1995@gmail.com',
            password: '0000',
            password_confirmation: '0000'
        });
        this.http.request(req).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
                case HttpEventType.Sent:
                    console.log('Request sent!');
                    const v = this.notify.info('wait...', {'timeout': 0});
                    break;
                case HttpEventType.ResponseHeader:
                    console.log('Response header received!');
                    break;
                case HttpEventType.DownloadProgress:
                    const kbLoaded = Math.round(event.loaded / 1024);
                    console.log(`Download in progress! ${ kbLoaded }Kb loaded`);
                    break;
                case HttpEventType.Response:
                    this.notify.clear();
                    console.log('😺 Done!', event.body);
                    this.notify.success('node 3la slamtak');
            }
        });
    }
}
