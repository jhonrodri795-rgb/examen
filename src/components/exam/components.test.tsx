import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChoiceQuestion } from './ChoiceQuestion';
import { BuildSentenceView } from '@/modules/writing/ui/WritingViews';
import { builtinBank } from '@/modules/question-bank/registry';
import type { AcademicPassageSet, BuildSentenceSet } from '@/modules/question-bank/types';

const passage = builtinBank.setById.get('rd-ap-camels') as AcademicPassageSet;
const multi = passage.questions.find((q) => q.kind === 'multiple')!;

describe('ChoiceQuestion', () => {
  it('permite seleccionar varias respuestas y muestra la explicación al revelar', async () => {
    const onChange = vi.fn();
    const { rerender } = render(<ChoiceQuestion question={multi} selected={[0]} onChange={onChange} disabled={false} revealed={false} />);
    expect(screen.getByText('Selecciona 2')).toBeInTheDocument();
    await userEvent.click(screen.getAllByRole('checkbox')[2]!);
    expect(onChange).toHaveBeenCalledWith([0, 2]);
    rerender(<ChoiceQuestion question={multi} selected={[0, 2]} onChange={onChange} disabled revealed />);
    expect(screen.getByText(/¡Correcto!/)).toBeInTheDocument();
    expect(screen.getByText(multi.explanation)).toBeInTheDocument();
  });

  it('no permite cambiar la respuesta cuando está bloqueada', async () => {
    const onChange = vi.fn();
    render(<ChoiceQuestion question={passage.questions[0]!} selected={[]} onChange={onChange} disabled revealed={false} />);
    await userEvent.click(screen.getAllByRole('radio')[1]!);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('BuildSentenceView', () => {
  it('añade y quita fragmentos con botones accesibles', async () => {
    const set = builtinBank.setById.get('wr-bs-museum') as BuildSentenceSet;
    const onChange = vi.fn();
    const { rerender } = render(<BuildSentenceView set={set} order={[]} onChange={onChange} disabled={false} revealed={false} />);
    await userEvent.click(screen.getByRole('button', { name: 'Añadir "really enjoyed"' }));
    expect(onChange).toHaveBeenLastCalledWith(['really enjoyed']);
    rerender(<BuildSentenceView set={set} order={['really enjoyed']} onChange={onChange} disabled={false} revealed={false} />);
    await userEvent.click(screen.getByRole('button', { name: /Quitar "really enjoyed"/ }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
});
