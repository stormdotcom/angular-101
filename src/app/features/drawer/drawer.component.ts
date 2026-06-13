import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DrawerComponent } from '../../shared/components/drawer/drawer.component';
import { TopicHeaderComponent } from '../../shared/components/topic-header/topic-header.component';

@Component({
  selector: 'app-drawer-feature',
  standalone: true,
  imports: [TopicHeaderComponent, DrawerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-topic-header
      title="Drawer"
      mode="WORKED"
      description="A reusable slide-in drawer. open/close state lives in a signal. ESC and the backdrop both close. Built on the same projection pattern as <app-modal>."
    />

    <button type="button"
      class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500"
      (click)="open.set(true)">Open drawer</button>

    <app-drawer
      [open]="open()"
      title="Filters"
      (closed)="open.set(false)"
    >
      <p class="text-slate-300 text-sm mb-3">
        The drawer body is projected via <code>&lt;ng-content&gt;</code> — drop a
        filters panel, a settings form, a help cheatsheet, whatever.
      </p>
      <ul class="space-y-2 text-sm">
        <li><label class="flex items-center gap-2"><input type="checkbox" /> Show archived</label></li>
        <li><label class="flex items-center gap-2"><input type="checkbox" /> Only mine</label></li>
        <li><label class="flex items-center gap-2"><input type="checkbox" /> Pending review</label></li>
      </ul>
    </app-drawer>
  `,
})
export class DrawerFeatureComponent {
  readonly open = signal(false);
}
