import React from 'react';

import { Container, Botside } from './styles';

interface Props {
    color: string;
    name: string;
    countProjects: number;
}

const countProjectString = (countProject: number) => 
{
    if (countProject === 1) {
        return " проект на этом языке за год";
    }
    else if (countProject < 5) {
        return " проекта на этом языке за год";
    }
    return " проектов на этом языке за год";
}

const LanguageCard: React.FC<Props> = ({    
    color,
    name,
    countProjects,}) => {
  return (
      <Container>
        <Botside>
            <ul>
                <li>
                    <div className={`language javascript`} style={{backgroundColor: color}}/>
                    <span>{name}</span>
                </li>
                <li>
                    <b>{countProjects}</b>
                    <span>{`${countProjectString(countProjects)}`}</span>
                </li>
            </ul>
        </Botside>
      </Container>
  );
}

export default LanguageCard;