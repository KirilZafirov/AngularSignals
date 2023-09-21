import { ChangeDetectionStrategy, Component,  OnDestroy, OnInit, computed, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Observable, Subject, combineLatest, map, tap } from 'rxjs';

@Component({
    selector: 'signals-derived-value',
    standalone: true,
    imports: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <button type="button" (click)="changeValues()">Change Values</button>

    <button type="button" (click)="changeValuesInSubjects()">Change Values In Subjects</button>
    <div>
        <!-- Signal getter -->
        {{ valueOne() }}   - Value 1
    </div>
    <div>
        <!-- Signal getter -->
        {{ valueTwo() }} - Value 2
</div>
        <div>
            {{ derivedValue() }} - Derived Value
        </div>
    <div>
        <!-- using the Async pipe  -->
        {{ countOne | async }}
    </div>

    <div>
        <!-- using the Async pipe  -->
        {{ countTwo | async }}
    </div>
    <div>
        <!-- using the Async pipe  -->
        {{ doubleCountSub | async }}
    </div>
  `,
    styles: [],
})
export class DerivedValueComponent implements OnInit, OnDestroy   {
    
    valueOne = signal(1);
    valueTwo = signal(10);
    derivedValue = computed( () => {
        console.log('Compute Value Using signals')
        return this.valueOne() * this.valueTwo()
    });
    changeValues(){
        this.valueOne.set(  2);
        this.valueTwo.set( 20);
    }
 
    
    private readonly destroy$$ = new Subject<void>();
    countOne = new BehaviorSubject(1);
    countTwo = new BehaviorSubject(20);

    doubleCountSub: Observable<number> = combineLatest([this.countOne, this.countTwo]).pipe(
        tap(([countOne, countTwo]) => console.log(`countOne: ${countOne}, countTwo: ${countTwo} , result ${countOne * countTwo}`)),
        map(([countOne, countTwo]) => countOne * countTwo));

    changeValuesInSubjects(){
        this.countOne.next(  2);
        this.countTwo.next( 20);
    }

    ngOnInit() {
        this.doubleCountSub.subscribe((value) => {
            console.log( `Result from countOne and countTwo: ${value}`) 
        })
    }

 
    public ngOnDestroy(): void {
        this.destroy$$.next();
    }
}