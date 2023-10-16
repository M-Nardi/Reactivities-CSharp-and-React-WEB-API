using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        // Parametros a serem recebidos para a edição da atividade
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        // Error handling fluentValidator
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                // Foi encontrado?
                if (activity == null) return null;

                _mapper.Map(request.Activity, activity);

                // Savechanges possui conteúdo no context sinalizando alteração?
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Não foi possivel editar a atividade.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}