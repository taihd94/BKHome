import { Component, OnInit } from '@angular/core';
import { SceneService} from '../../../services/rest-api/scene.service';

@Component({
  selector: 'app-scripts',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.css']
})
export class ScenesComponent implements OnInit {
  constructor(
    private sceneService: SceneService
  ) { }

  scenes: any;

  ngOnInit() {
    this.sceneService.getListOfScenes().subscribe(scenes=>{
      this.scenes = scenes;
    })
  }

}
