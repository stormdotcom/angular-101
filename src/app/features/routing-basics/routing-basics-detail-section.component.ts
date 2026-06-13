import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Grandchild route — shown inside <router-outlet /> of routing-basics-detail.
 * Bound params:
 *   - id        : parent route's :id (only visible because app.config sets
 *                 paramsInheritanceStrategy: 'always')
 *   - sectionId : this route's own :sectionId param
 */
@Component({
  selector: 'app-routing-basics-detail-section',
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
export class RoutingBasicsDetailSectionComponent {
  @Input() id?: string;          // inherits from parent :id (needs paramsInheritanceStrategy)
  @Input() sectionId?: string;   // own :sectionId
}
