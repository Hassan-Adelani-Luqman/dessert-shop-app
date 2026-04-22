import { Injectable, computed, signal } from '@angular/core';

export type LogLevel = 'info' | 'action' | 'error';

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  action: string;
  details?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private _logs = signal<LogEntry[]>([]);

  logs = this._logs.asReadonly();

  recentActions = computed(() =>
    this._logs()
      .filter((entry) => entry.level === 'action')
      .slice(-10)
  );

  actionCount = computed(() => this._logs().filter((e) => e.level === 'action').length);

  log(action: string, details?: Record<string, unknown>, level: LogLevel = 'info'): void {
    const entry: LogEntry = { timestamp: new Date(), level, action, details };
    this._logs.update((logs) => [...logs, entry]);
    console.log(`[${level.toUpperCase()}] ${action}`, details ?? '');
  }

  action(action: string, details?: Record<string, unknown>): void {
    this.log(action, details, 'action');
  }

  error(action: string, details?: Record<string, unknown>): void {
    this.log(action, details, 'error');
  }

  clearLogs(): void {
    this._logs.set([]);
  }
}
