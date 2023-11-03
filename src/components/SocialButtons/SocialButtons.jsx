import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

import './SocialButtons.css';

export default function SocialButtons() {
  return (
    <div className="social-btns">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://titoworld.dev"
        style={{
          marginRight: 'auto'
        }}
      >
        <h4>titoworld.dev</h4>
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/titoworlddev/qr-code-creator"
      >
        <IconBrandGithub color="#1d455f" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/in/cristian-arias-mejuto/"
      >
        <IconBrandLinkedin color="#1d455f" />
      </a>
    </div>
  );
}
