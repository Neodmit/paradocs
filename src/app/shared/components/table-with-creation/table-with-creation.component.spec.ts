import { TableWithCreationComponent } from './table-with-creation.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

describe('TableWithCreationComponent', () => {
  let component: TableWithCreationComponent;
  let fixture: ComponentFixture<TableWithCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableWithCreationComponent],
      imports: [MatTableModule],
    });
    fixture = TestBed.createComponent(TableWithCreationComponent);
    component = fixture.componentInstance;

    component.dataSource = new MatTableDataSource([{ test: 'test' }]);
    component.tableFields = {};

    fixture.detectChanges();
  });

  it('should onDelete emit', () => {
    spyOn(component.onDelete, 'emit');

    component.delete('test');

    expect(component.onDelete.emit).toHaveBeenCalledWith('test');
  });

  it('should onEdit emit', () => {
    spyOn(component.onEdit, 'emit');

    component.edit('test');

    expect(component.onEdit.emit).toHaveBeenCalledWith('test');
  });

  it('should onEdit emit', () => {
    spyOn(component.onAdd, 'emit');

    component.add();

    expect(component.onAdd.emit).toHaveBeenCalled();
  });

  it('should return value by objKey with isCellMultipleMode', () => {
    component.tableFields = {
      key1: { name: 'test', key: 'subKey1', isCellMultipleMode: true },
      key2: { name: 'test', key: 'subKey2', isCellMultipleMode: false },
      key3: { name: 'test', isCellMultipleMode: true },
      key4: { name: 'test', isCellMultipleMode: false },
    };

    const element = { subKey1: 'value1', subKey2: 'value2' };
    const result = component.getRowItem(element, 'key1');

    expect(result).toBe('value1');
  });

  it('should return value with isCellMultipleMode', () => {
    component.tableFields = {
      key1: { name: 'test', key: 'subKey1', isCellMultipleMode: true },
      key2: { name: 'test', key: 'subKey2', isCellMultipleMode: false },
      key3: { name: 'test', isCellMultipleMode: true },
      key4: { name: 'test', isCellMultipleMode: false },
    };

    const element = { subKey1: 'value1', subKey2: 'value2' };
    const result = component.getRowItem(element, 'key3');

    expect(result).toBe(element);
  });

  it('should return value by headerKey and objKey without isCellMultipleMode', () => {
    component.tableFields = {
      key1: { name: 'test', key: 'subKey1', isCellMultipleMode: true },
      key2: { name: 'test', key: 'subKey2', isCellMultipleMode: false },
      key3: { name: 'test', isCellMultipleMode: true },
      key4: { name: 'test', isCellMultipleMode: false },
    };

    const element = { key2: { subKey2: 'value2' } };
    const result = component.getRowItem(element, 'key2');

    expect(result).toBe('value2');
  });

  it('should return value by headerKey without isCellMultipleMode', () => {
    component.tableFields = {
      key1: { name: 'test', key: 'subKey1', isCellMultipleMode: true },
      key2: { name: 'test', key: 'subKey2', isCellMultipleMode: false },
      key3: { name: 'test', isCellMultipleMode: true },
      key4: { name: 'test', isCellMultipleMode: false },
    };

    const element = { key4: 'value4' };
    const result = component.getRowItem(element, 'key4');

    expect(result).toBe('value4');
  });
});
