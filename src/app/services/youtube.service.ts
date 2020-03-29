import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'API_KEY';
  private playlist = 'URL_PLAYLIST';
  private nextPageToken = '';

  constructor( private http: HttpClient) { }

  getVideos() {

    const url = `${this.youtubeUrl}/playlistItems`;
    let parametros: any;

    if (this.nextPageToken) {
      parametros = new HttpParams()
    .set('part', 'snippet')
    .set('maxResults', '10')
    .set('playlistId', this.playlist)
    .set('key', this.apikey)
    .set('pageToken', this.nextPageToken);
    } else {
      parametros = new HttpParams()
    .set('part', 'snippet')
    .set('maxResults', '10')
    .set('playlistId', this.playlist)
    .set('key', this.apikey);
    }

    console.log(parametros);

    return this.http.get(url, { params: parametros })
              .pipe(map( resp => {
                console.log(resp);
                this.nextPageToken = resp.nextPageToken;
                const videos: any[] = [];

                for (const video of resp.items) {
                  const snippet = video.snippet;
                  videos.push(snippet);
                }
                return videos;
              }));


  }
}
