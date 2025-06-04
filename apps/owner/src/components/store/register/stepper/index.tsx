interface StepperProps {
  step: number;
}

const steps = ["가게 등록", "상세 설정", "픽업 설정"];

export function Stepper({ step }: StepperProps) {
  return (
    <ol className="flex items-center justify-center gap-8">
      {steps.map((label, index) => {
        const isActive = step === index + 1;
        const isCompleted = step > index + 1;

        return (
          <li
            key={label}
            className="flex flex-col items-center"
            aria-current={isActive ? "step" : undefined}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                isActive ? "bg-[#35A865]" : isCompleted ? "bg-[#809588]" : "bg-gray-300"
              }`}
              aria-label={`${label} ${isActive ? "현재 단계" : isCompleted ? "완료된 단계" : "미완료 단계"}`}
            />
            <span className="mt-1 text-xs text-center text-gray-600">{label}</span>
            {index < steps.length - 1 && (
              <div
                className="w-16 h-px bg-gray-300 absolute left-[calc(100%+0.5rem)] top-2"
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
