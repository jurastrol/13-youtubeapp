import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSeleccionado: any;
  // tslint:disable-next-line: variable-name
  constructor( public _ys: YoutubeService) {
    this._ys.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

  ngOnInit(): void {
  }

  cargarMas() {
    this._ys.getVideos().subscribe(videos => {
      this.videos.push.apply(this.videos, videos);
    });
  }

  verVideo(video: any) {
    this.videoSeleccionado = video;
    $('#myModal').modal();
  }

  cerrarModal() {
    this.videoSeleccionado = null;
    $('#myModal').modal('hide');
  }

}
