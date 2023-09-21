import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';


@Component({
    selector: 'signals-double-count',
    standalone: true,
    imports: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
  <button type="button" (click)="changeValue()">Change Values</button>
    <div>
        <!-- Signal getter -->
        {{ count() }}   
    </div>
    <div>
        <!-- Signal getter -->
        {{ doubleCount() }}
</div>
<div>
    {{propFromDoubleCount}}
</div>
<div>
        <!-- using the Async pipe  -->
        {{ countSub | async }}
    </div>
    <div>
        <!-- using the Async pipe  -->
        {{ doubleCountSub | async }}
    </div> 
    <div>
        <!-- using the Async pipe  -->
        <!-- Property 'value' does not exist on type 'Observable<number>' -->
        <!-- {{ doubleCountSub.value }} -->
    </div>
    <div>
        <!-- using the Async pipe  -->
        <!-- Property 'getValue' does not exist on type 'Observable<number>' -->
        <!-- {{ doubleCountSub.getValue()}} -->
    </div>
  `,
    styles: [],
})
export class DoubleCountComponent {
 

    count = signal(2);

    // Computed signals are both lazily evaluated and memoized
    doubleCount = computed(() => {
        console.log('using signals from assignment to doubleCount')
        return this.count() * 2;
    });

    propFromDoubleCount = `Ordinary string with Signal value: ${this.doubleCount()}`



    private readonly destroy$$ = new Subject<void>();
    countSub = new BehaviorSubject(2);
    // Doesn't have access to the current value but the most recent one
    doubleCountSub: Observable<number> = this.countSub.pipe(map((count) => count * 2),
    tap(value => console.log('using subjects from assignment to doubleCountSub', value)));
    propFromDoubleCountSubject = '';
    // In order to do the same we need to subscribe to the value and then unsubscribe
    
    changeValue() {
        this.count.set(this.count() + 2);
        this.countSub.next(this.countSub.value + 2);
    }
    
    ngOnInit() {
        // Property 'set' does not exist on type 'Signal<number>'.
        // this.doubleCount.set(5);
        this.countSub.pipe(map((count) => count * 2)).subscribe((value) => {
            console.log('using subjects from assignment to propFromDoubleCountSubject')
            this.propFromDoubleCountSubject = `Ordinary string with Signal value: ${value}`;
        });
    }
    public ngOnDestroy(): void {
        this.destroy$$.next();
    }
}