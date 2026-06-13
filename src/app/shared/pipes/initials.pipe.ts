import { Pipe, PipeTransform } from '@angular/core';

/**
 * Standalone custom pipe — turns "Ada Lovelace" into "AL".
 * Used in /pipes alongside the built-in `async` pipe.
 */
@Pipe({ name: 'initials', standalone: true })
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined, max = 2): string {
    if (!value) return '';
    return value
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, max)
      .map(part => part[0]!.toUpperCase())
      .join('');
  }
}
