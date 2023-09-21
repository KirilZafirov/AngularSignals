import { ChangeDetectionStrategy, Component, Injector, OnDestroy, effect, signal, untracked } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'signals-effects',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    {{currentUser()}}
  `,
    styles: [],
})
export class BasicCountComponent implements OnDestroy {
    readonly count = signal(0);
    readonly currentUser = signal('Kiril');
    constructor(private injector: Injector) {
        // Register a new effect.
        effect(() => {
            console.log(`The count is: ${this.count()})`);
        });

        effect(() => {
            const user = this.currentUser();
            untracked(() => {
                // If the `loggingService` reads signals, they won't be counted as
                // dependencies of this effect.
                console.log(`User set to ${user}`);
            });
        });
    }

    private loggingEffect = effect(() => {
        console.log(`The count is: ${this.count()})`);
    });
    data = signal(['test'], { equal: this.isEqual });

    isEqual(): boolean {
        console.log('isEqual called');
        return false
    }

 


initializeLogging(): void {
    effect(() => {
    console.log(`The count is: ${this.count()})`);
}, { injector: this.injector });
    }

ngOnDestroy(): void {
    this.loggingEffect.destroy();
}
}