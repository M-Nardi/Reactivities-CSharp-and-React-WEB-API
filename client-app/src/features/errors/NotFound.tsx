import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Ops! - procuramos em todo o lugar mas não encontramos o que você procurava!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Retornar para página de atividades
                </Button>
            </Segment.Inline>
        </Segment>
    )
}