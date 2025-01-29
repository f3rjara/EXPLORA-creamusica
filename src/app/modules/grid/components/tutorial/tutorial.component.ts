import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginServerService } from '@app/shared/services/login-server.service';
import { UserInteractionService } from '@app/shared/services/user-interaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TutorialComponent implements OnDestroy {
  private isShowTutorial: boolean;
  public languageSelect: string = 'spanish';
  userInteractionSubscribe: Subscription;

  constructor(
    private userInteraction: UserInteractionService,
    private loginServerService: LoginServerService,
    private route: ActivatedRoute
  ) {
    this.userInteractionSubscribe =
      this.userInteraction.getShowTutorial$.subscribe((show) => {
        this.isShowTutorial = show;
      });
    this.languageSelect = this.route.snapshot.paramMap.get('language');
  }
  ngOnDestroy(): void {
    this.userInteractionSubscribe.unsubscribe();
  }

  endShowtutorial() {
    // set a Fales value showTutorial
    this.userInteraction.setShowTutorial(false);
  }
}
