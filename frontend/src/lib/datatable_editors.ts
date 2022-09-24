import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import type { ColumnEditorOptions } from 'primereact/column';

export const textEditor: InputText = (options: ColumnEditorOptions) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
}
