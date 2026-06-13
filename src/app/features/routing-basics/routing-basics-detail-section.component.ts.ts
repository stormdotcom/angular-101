import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-routing-basics-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="text-slate-300">
      Section: <b>{{ sectionId }}</b>
    </p>
    <p class="text-xs text-slate-400 mt-1">
      Full path is <code>/routing-basics/detail/{{ id }}/{{ sectionId }}</code>
    </p>
  `,
})
export class RoutingBasicsDetailSectionComponent  {
  @Input() id?: string;          // inherits from parent param
  @Input() sectionId?: string;   // own param
}
