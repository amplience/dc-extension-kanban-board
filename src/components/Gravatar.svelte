<script>
  import type { User } from 'dc-extensions-sdk/dist/types/lib/components/Users';
  import { PRESETS } from '../services/models/status';
  import { gravatars } from '../services/stores/gravatar';
  import md5 from 'md5';


  const GRAVATAR_URL = 'https://www.gravatar.com/avatar' as const;
  const GRAVATAR_QUERY = '?d=404&s=56' as const;
  const GRAVATAR_COLORS = Object.keys(PRESETS);

  export let user: User;

  const emailHash = md5(user.email);

  async function resolveGravatar(): Promise<string | null> {
    let gravatarUrl = $gravatars.get(emailHash);
    if (gravatarUrl !== undefined) {
      return gravatarUrl
    }

    gravatarUrl = `${GRAVATAR_URL}/${emailHash}${GRAVATAR_QUERY}`;
    const res = await fetch(gravatarUrl);
    if(!res.ok) {
      gravatarUrl = null;
    }

    $gravatars.set(emailHash, gravatarUrl);
    return gravatarUrl;
  }

  function getUserInitial(): string {
    return user.firstName.charAt(0).toUpperCase();
  }

  function getColor(): string {
    if (!emailHash) {
      return '#999';
    }
    const numFromHash = parseInt(emailHash.replace(/[^\d]+/, ''), 10);
    return GRAVATAR_COLORS[numFromHash % GRAVATAR_COLORS.length];
  }
</script>

<style lang="scss">
  .gravatar {
    display: inline-flex;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    overflow: hidden;
    color: #fff;
    text-transform: uppercase;
    margin: 5px 0;
    font-weight: 500;
    font-size: 16px;
  }

  .gravatar img {
    width: 28px;
    height: 28px;
  }

  .gravatar-intial {
    background-color: var(--gravatar-color);
    display: flex;
    flex: 1 1 100%;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }
</style>

<div class="gravatar">
{#await resolveGravatar() then gravatarUrl}
  {#if gravatarUrl !== null}
  <img alt={`${user.firstName} ${user.lastName}`} src={gravatarUrl} />
  {:else}
  <div class="gravatar-intial" style="--gravatar-color: {getColor()}" >{getUserInitial()}</div>
  {/if}
{/await}
</div>
