import type { PipelineRun, StageId } from './pipeline';
import { showTy } from '../toycaml/ast';
import { showValueShort } from './evalTrace';

// Horizontal pipeline status: one chip per stage, arrows between. A run
// lights each stage green as far as it got; the failing stage shows red and
// everything after it stays dim.

type StageState = 'idle' | 'ok' | 'fail' | 'skip';

const STAGE_ORDER: StageId[] = ['source', 'tokens', 'ast', 'type', 'value'];
const STAGE_LABEL: Record<StageId, string> = {
  source: 'source',
  tokens: 'tokens',
  ast: 'AST',
  type: 'type',
  value: 'value',
};

function stageState(run: PipelineRun | null, stage: StageId): StageState {
  if (!run) return 'idle';
  if (stage === 'source') return 'ok';
  if (run.failedAt === stage) return 'fail';
  const failedIdx = run.failedAt ? STAGE_ORDER.indexOf(run.failedAt) : Infinity;
  return STAGE_ORDER.indexOf(stage) < failedIdx ? 'ok' : 'skip';
}

/** Tiny per-stage summary shown under the label once that stage has run. */
function stageDetail(run: PipelineRun | null, stage: StageId): string {
  if (!run || stageState(run, stage) !== 'ok') return '';
  switch (stage) {
    case 'source':
      return `${run.src.length} chars`;
    case 'tokens':
      return `${run.tokens?.length ?? 0} tokens`;
    case 'ast':
      return '1 tree';
    case 'type':
      return run.ty ? showTy(run.ty) : '';
    case 'value':
      return run.value ? showValueShort(run.value) : '';
  }
}

export default function PipelineRail({ run }: { run: PipelineRun | null }) {
  return (
    <div className="cp-rail" role="status" aria-label="Pipeline stages">
      {STAGE_ORDER.map((stage, i) => {
        const state = stageState(run, stage);
        return (
          <span key={stage} className="cp-rail-seg">
            <span className={`cp-rail-stage is-${state}`}>
              <span className="cp-rail-label">{STAGE_LABEL[stage]}</span>
              <span className="cp-rail-detail">
                {state === 'fail' ? 'failed' : stageDetail(run, stage) || '·'}
              </span>
            </span>
            {i < STAGE_ORDER.length - 1 && (
              <span className="cp-rail-arrow" aria-hidden="true">
                →
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
