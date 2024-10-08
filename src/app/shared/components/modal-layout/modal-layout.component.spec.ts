import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalLayoutComponent } from './modal-layout.component';

describe('ModalLayoutComponent', () => {
  let component: ModalLayoutComponent;
  let fixture: ComponentFixture<ModalLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLayoutComponent],
    });
    fixture = TestBed.createComponent(ModalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should onSave emit', () => {
    spyOn(component.onSave, 'emit');

    component.save();

    expect(component.onSave.emit).toHaveBeenCalled();
  });
});
